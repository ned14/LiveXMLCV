<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns="http://www.w3.org/1999/xhtml" xmlns:xhtml="http://www.w3.org/1999/xhtml"
    xmlns:xs="http://www.w3.org/2001/XMLSchema-instance"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xmlns:dt="http://xsltsl.org/date-time"
    xmlns:mods="http://www.loc.gov/mods/v3"
    xs:schemaLocation="cv.xsd" exclude-result-prefixes="xhtml xsl xs xsi dt mods" version="1.0">
    <xsl:output omit-xml-declaration="yes" method="xml" media-type="application/xhtml+xml"
        doctype-system="http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd"
        doctype-public="-//W3C//DTD XHTML 1.1//EN" encoding="UTF-8" indent="yes"/>
    <xsl:include href="date-time.xsl"/>

    <xsl:param name="profilename" select="'allpossibledata'"/>
    <xsl:param name="inhibitdetailfor" select="''"/>
    <xsl:param name="showprivatedetails" select="true()"/>
    <xsl:param name="showgraph" select="true()"/>
    <xsl:param name="showskills" select="true()"/>
    <xsl:param name="showotherexperiences" select="true()"/>
    <xsl:param name="showpaid" select="true()"/>
    <xsl:param name="showunpaid" select="true()"/>
    <xsl:param name="showopensource" select="true()"/>
    
    <!-- This rigmarole is due to a lot of XSLT implementations being only able
        to take string type parameters i.e. no matter what you supply, they
        silently convert it into a string which borks the boolean logic :( -->
    <xsl:variable name="showprivatedetails_" select="$showprivatedetails='1'"/>
    <xsl:variable name="showgraph_" select="$showgraph='1'"/>
    <xsl:variable name="showskills_" select="$showskills='1'"/>
    <xsl:variable name="showotherexperiences_" select="$showotherexperiences='1'"/>
    <xsl:variable name="showpaid_" select="$showpaid='1'"/>
    <xsl:variable name="showunpaid_" select="$showunpaid='1'"/>
    <xsl:variable name="showopensource_" select="$showopensource='1'"/>
    
    <xsl:template name="daterange" xmlns="http://www.w3.org/1999/xhtml">
        <xsl:param name="start"/>
        <xsl:param name="end"/>
        <abbr class="dtstart" title="{$start}">
            <xsl:call-template name="dt:format-date-time">
                <xsl:with-param name="xsd-date-time" select="$start"/>
                <xsl:with-param name="format" select="'%b %Y'"/>
            </xsl:call-template>
        </abbr><xsl:if test="substring($end, 1, 7)!=substring($start, 1, 7)"> &#8212; <abbr class="dtend" title="{$end}"><xsl:choose>
            <xsl:when test="$end='unbounded'">present</xsl:when>
            <xsl:otherwise>
                <xsl:call-template name="dt:format-date-time">
                    <xsl:with-param name="xsd-date-time" select="$end"/>
                    <xsl:with-param name="format" select="'%b %Y'"/>
                </xsl:call-template>
            </xsl:otherwise>
        </xsl:choose></abbr></xsl:if>
    </xsl:template>

    <xsl:template match="/curriculumvitae">
        <html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en">
            <head>
                <meta http-equiv="Content-Style-Type" content="text/css"/>
                <meta http-equiv="Content-Type" content="application/xhtml\+xml; charset=utf-8"/>
                <meta http-equiv="Content-Language" content="{@lang}"/>
                <title>Curriculum Vitae For <xsl:value-of select="@forwhom"/></title>
                <link rel="stylesheet" href="CVtoXHTML.css" type="text/css"/>
                <link rel="stylesheet" href="CVtoXHTMLprint.css" type="text/css" media="print"/>
                <xsl:comment><![CDATA[[if IE]>
                <link rel="stylesheet" href="CVtoXHTMLie.css" type="text/css" />
                <![endif]]]></xsl:comment>
            </head>
            <body class="hresume">
                <xsl:apply-templates select="privatedetails"/>
                <xsl:apply-templates select="introduction"/>
                <xsl:call-template   name=  "ganttchart"/>
                <xsl:apply-templates select="skills"/>
                <xsl:apply-templates select="qualifications"/>
                <xsl:apply-templates select="memberships"/>
                <xsl:apply-templates select="recognitions"/>
                <xsl:apply-templates select="experiences"/>
                <xsl:apply-templates select="publications"/>
                <xsl:apply-templates select="academicreferees"/>
                <xsl:apply-templates select="workreferees"/>
            </body>
        </html>
    </xsl:template>

    <xsl:template match="privatedetails" xmlns="http://www.w3.org/1999/xhtml">
        <table class="privatedetails vcard" id="privatedetails">
            <tr>
                <td class="name">
                    <span class="fn"><xsl:value-of select="../name"/></span>
                </td>
                <td/>
                <td class="email">
                    <xsl:choose>
                        <xsl:when test="$showprivatedetails_">
                            <a href="mailto:{email}">
                                <xsl:value-of select="email"/>
                            </a>
                        </xsl:when>
                        <xsl:otherwise>xxxxxx@xxxxxxx.xxx</xsl:otherwise>
                    </xsl:choose>
                </td>
            </tr>
            <tr>
                <td class="address adr">
                    <xsl:choose>
                        <xsl:when test="$showprivatedetails_">
                            <span class="adr"><span class="street-address"><xsl:apply-templates select="address"/></span></span>
                        </xsl:when>
                        <xsl:otherwise>xxxxxxxxxxxx<br/>xxxxxxxxxx<br/>xxxxxxxxxxx<br/>xxxxxxx</xsl:otherwise>
                    </xsl:choose>
                </td>
                <td class="telephone">
                    <xsl:choose>
                        <xsl:when test="$showprivatedetails_">
                            <span class="tel"><xsl:value-of select="telephone"/></span>
                        </xsl:when>
                        <xsl:otherwise>xxxx xx xxxxxxx</xsl:otherwise>
                    </xsl:choose>
                </td>
                <td class="dateofbirth">Date of Birth: <xsl:choose>
                        <xsl:when test="$showprivatedetails_">
                            <xsl:call-template name="dt:format-date-time">
                                <xsl:with-param name="xsd-date-time" select="dateofbirth"/>
                                <xsl:with-param name="format" select="'%d %b %Y'"/>
                            </xsl:call-template>
                        </xsl:when>
                        <xsl:otherwise>xxxx xxx xxxx</xsl:otherwise>
                    </xsl:choose>
                </td>
            </tr>
            <tr>
                <td class="version" colspan="2"/>
                <td class="profile">rev. <xsl:value-of select="../revision"/> xmlprofile:
                        '<xsl:value-of select="$profilename"/>'</td>
            </tr>
        </table>
    </xsl:template>

    <!-- This is a handy workaround for all those stupid xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        you get all over the XHTML when copied using <xsl:copy-of>. We use the fairly unknown feature of
        binding templates to a certain scope (mode) to restrict processing to just XHTML -->
    <xsl:template match="xhtml:div">
        <xsl:apply-templates mode="xhtml"/>
    </xsl:template>
    <xsl:template match="*" mode="xhtml">
        <xsl:element name="{name()}" namespace="{namespace-uri()}">
            <xsl:copy-of select="@*"/>
            <xsl:apply-templates mode="xhtml"/>
        </xsl:element>
    </xsl:template>
    
    <xsl:template match="introduction" xmlns="http://www.w3.org/1999/xhtml">
        <div class="introduction summary">
            <xsl:for-each select="specialize[@profile=$profilename]">
                <xsl:apply-templates select="xhtml:div"/>                
            </xsl:for-each>
            <xsl:apply-templates select="xhtml:div"/>
        </div>
    </xsl:template>

    <xsl:template name="insertdate" xmlns="http://www.w3.org/1999/xhtml">
        <xsl:param name="from"/>
        <xsl:param name="to"/>
        <xsl:param name="step" select="1"/>
        <xsl:param name="first" select="$from"/>
        <xsl:variable name="firstyear" select="number(substring($first, 1, 4))"/>
        <xsl:variable name="firstmonth" select="number(substring($first, 6, 2))"/>
        <xsl:variable name="fromyear" select="number(substring($from, 1, 4))"/>
        <xsl:variable name="frommonth" select="number(substring($from, 6, 2))"/>
        <xsl:variable name="toyear" select="number(substring($to, 1, 4))"/>
        <xsl:variable name="tomonth" select="number(substring($to, 6, 2))"/>
        <xsl:variable name="complete" select="(100 * (($fromyear * 12 + $frommonth) - ($firstyear * 12 + $firstmonth)) ) div (($toyear * 12 + $tomonth) - ($firstyear * 12 + $firstmonth))"/>
        <xsl:if test="$first=$from or $from=$to or (($frommonth - 1) mod $step=0 and $complete &gt; 2 and $complete &lt; 98)">
            <span class="label" style="left:{$complete}%;"><xsl:value-of select="$from"/></span>
        </xsl:if>
        <xsl:if test="$from!=$to">
            <xsl:choose>
                <xsl:when test="$frommonth+1=13">
                    <xsl:call-template name="insertdate">
                        <xsl:with-param name="from" select="concat($fromyear+1, '-', '01')"/>
                        <xsl:with-param name="to" select="$to"/>
                        <xsl:with-param name="step" select="$step"/>
                        <xsl:with-param name="first" select="$first"/>
                    </xsl:call-template>
                </xsl:when>
                <xsl:when test="$frommonth+1 &lt; 10">
                    <xsl:call-template name="insertdate">
                        <xsl:with-param name="from" select="concat($fromyear, '-0', $frommonth+1)"/>
                        <xsl:with-param name="to" select="$to"/>
                        <xsl:with-param name="step" select="$step"/>
                        <xsl:with-param name="first" select="$first"/>
                    </xsl:call-template>
                </xsl:when>
                <xsl:otherwise>
                    <xsl:call-template name="insertdate">
                        <xsl:with-param name="from" select="concat($fromyear, '-', $frommonth+1)"/>
                        <xsl:with-param name="to" select="$to"/>
                        <xsl:with-param name="step" select="$step"/>
                        <xsl:with-param name="first" select="$first"/>
                    </xsl:call-template>
                </xsl:otherwise>
            </xsl:choose>
        </xsl:if>
    </xsl:template>
    <xsl:template name="ganttchart" xmlns="http://www.w3.org/1999/xhtml">
        <xsl:if test="$showgraph_">
            <xsl:variable name="firstdate"
                select="substring(experiences/experience[last()]/start, 1, 7)"/>
            <xsl:variable name="lastdate2">
                <xsl:choose>
                    <xsl:when
                        test="experiences/experience[1]/end &gt; qualifications/award[1]/end">
                        <xsl:value-of select="experiences/experience[1]/end"/>
                    </xsl:when>
                    <xsl:otherwise>
                        <xsl:value-of select="qualifications/award[1]/end"/>
                    </xsl:otherwise>
                </xsl:choose>
            </xsl:variable>
            <xsl:variable name="lastdate" select="substring($lastdate2, 1, 7)"/>
            <xsl:variable name="firstyear" select="number(substring($firstdate, 1, 4))"/>
            <xsl:variable name="firstmonth" select="number(substring($firstdate, 6, 2))"/>
            <xsl:variable name="lastyear" select="number(substring($lastdate, 1, 4))"/>
            <xsl:variable name="lastmonth" select="number(substring($lastdate, 6, 2))"/>
            <div class="ganttchart keeptogether">
                <table class="ganttchart">
                    <tr class="timeline">
                        <td/>
                        <td>
                            <div class="timeline">
                                <xsl:call-template name="insertdate">
                                    <xsl:with-param name="from" select="$firstdate"/>
                                    <xsl:with-param name="to" select="$lastdate"/>
                                    <xsl:with-param name="step" select="6"/>
                                </xsl:call-template>
                            </div>
                        </td>
                    </tr>
                    <xsl:for-each
                        select="qualifications/award[substring(end, 1, 7)!=substring(start, 1, 7)]|experiences/experience[substring(end, 1, 7)!=substring(start, 1, 7)]">
                        <xsl:variable name="startyear" select="number(substring(start, 1, 4))"/>
                        <xsl:variable name="startmonth" select="number(substring(start, 6, 2))"/>
                        <xsl:variable name="endyear" select="number(substring(end, 1, 4))"/>
                        <xsl:variable name="endmonth" select="number(substring(end, 6, 2))"/>
                        <xsl:variable name="startpercent"
                            select="(100 * (($startyear * 12 + $startmonth) - ($firstyear * 12 + $firstmonth)) ) div (($lastyear * 12 + $lastmonth) - ($firstyear * 12 + $firstmonth))"/>
                        <xsl:variable name="endpercent"
                            select="(100 * (($endyear * 12 + $endmonth) - ($firstyear * 12 + $firstmonth)) ) div (($lastyear * 12 + $lastmonth) - ($firstyear * 12 + $firstmonth))"/>
                        <xsl:if test="$startpercent &gt;= 0">
                            <tr class="item"
                                title="{normalize-space(concat(grade, ' ', name, ' ', title, ' ', institution, employer, ' ', location, ': ', dissertation, description))}">
                                <td class="label"><xsl:value-of select="name"
                                        />&#160;<xsl:value-of select="title"/>:</td>
                                <td class="period">
                                    <div style="position:relative;">
                                        <xsl:choose>
                                            <xsl:when test="string($endpercent)='NaN'">
                                                <div
                                                  style="position: absolute; left: {$startpercent}%; width: {101 - $startpercent}%;"
                                                />
                                            </xsl:when>
                                            <xsl:otherwise>
                                                <div
                                                  style="position: absolute; left: {$startpercent}%; width: {$endpercent - $startpercent}%;"
                                                />
                                            </xsl:otherwise>
                                        </xsl:choose>

                                    </div>
                                </td>
                            </tr>
                        </xsl:if>
                    </xsl:for-each>
                    <tr class="timeline">
                        <td/>
                        <td>
                            <div class="timeline">
                                <xsl:call-template name="insertdate">
                                    <xsl:with-param name="from" select="$firstdate"/>
                                    <xsl:with-param name="to" select="$lastdate"/>
                                    <xsl:with-param name="step" select="6"/>
                                </xsl:call-template>
                            </div>
                        </td>
                    </tr>
                </table>
            </div>
        </xsl:if>
    </xsl:template>

    <xsl:template match="skills" xmlns="http://www.w3.org/1999/xhtml">
        <xsl:if test="$showskills_">
            <div class="keeptogether">
                <div class="sectionheader">
                    <img class="sectionheader" alt="" src="sectionheader.png"/>
                    <h2 class="skills">Skills:</h2>
                </div>
                <xsl:for-each select="skillsgroup">
                    <h3 class="{name(.)}">
                        <xsl:value-of select="@type"/>
                    </h3>
                    <table class="{name(.)}">
                        <xsl:for-each select="skill">
                            <tr class="_{name(.)}">
                                <th class="_{name(.)}">
                                    <xsl:value-of select="@name"/>
                                </th>
                                <xsl:for-each select="specificskill">
                                    <xsl:if test="position() &lt; 9">
                                        <td class="_{name(.)}">
                                            <span class="skill">
                                                <xsl:value-of select="."/>
                                            </span>
                                        </td>
                                    </xsl:if>
                                </xsl:for-each>
                            </tr>
                            <xsl:if test="count(specificskill) &gt; 8">
                                <tr class="_{name(.)}">
                                    <th class="_{name(.)}" />                                    
                                    <xsl:for-each select="specificskill">
                                        <xsl:if test="position() &gt; 8">
                                            <td class="_{name(.)}">
                                                <span class="skill">
                                                    <xsl:value-of select="."/>
                                                </span>
                                            </td>
                                        </xsl:if>
                                    </xsl:for-each>
                                </tr>
                            </xsl:if>
                            <tr class="spacer"><td> </td></tr>
                        </xsl:for-each>
                    </table>
                </xsl:for-each>
            </div>
        </xsl:if>
    </xsl:template>

    <xsl:template match="qualifications" xmlns="http://www.w3.org/1999/xhtml">
        <div class="keeptogether">
            <div class="sectionheader">
                <img class="sectionheader" alt="" src="sectionheader.png"/>
                <h2 class="qualifications">Qualifications:</h2>
            </div>
            <table class="qualifications vcalendar">
                <xsl:for-each select="award">
                    <tr class="{name(.)}">
                        <th class="{name(.)}" colspan="3">[ISCED level <xsl:value-of
                                select="iscedcategory/iscedlevel"/> code <xsl:value-of
                                select="iscedcategory/iscedfield1"/>.<xsl:value-of
                                select="iscedcategory/iscedfield2"/>
                            <xsl:variable name="iscedfield2"
                                select="iscedcategory/iscedfield2/text()"/> (<xsl:value-of
                                select="document('schemas/ISCED97.xsd')//*[@value=$iscedfield2]/*/*[@xml:lang='en']"
                            />)]</th>
                    </tr>
                    <tr class="{name(.)} education vevent">
                        <td class="title">
                            <span class="summary"><xsl:value-of select="@type"/> (<xsl:value-of
                                    select="name"/>) <xsl:value-of select="title"/></span>
                        </td>
                        <td class="grade">
                            <xsl:value-of select="grade"/>
                        </td>
                        <td class="period">
                            <xsl:call-template name="daterange">
                                <xsl:with-param name="start" select="start"/>
                                <xsl:with-param name="end" select="end"/>
                            </xsl:call-template>
                        </td>
                    </tr>
                    <tr class="{name(.)}">
                        <td class="institution">
                            <xsl:value-of select="institution"/>
                        </td>
                        <td/>
                        <td class="location">
                            <xsl:value-of select="location/city"/>, <xsl:if test="location/county">
                                <xsl:value-of select="location/county"/>, </xsl:if>
                            <xsl:variable name="country" select="location/country/text()"/>
                            <xsl:value-of
                                select="document('schemas/ISOCountryCodeType-V2006.xsd')//*[@value=$country]/*/*"
                            />
                        </td>
                    </tr>
                    <xsl:if test="dissertation/text()">
                        <tr class="{name(.)}">
                            <td class="dissertation" colspan="3">Dissertation topic was: <em>
                                    <xsl:value-of select="dissertation"/>
                                </em></td>
                        </tr>
                    </xsl:if>
                    <tr class="{name(.)} spacer">
                        <td colspan="3"/>
                    </tr>
                </xsl:for-each>
            </table>
        </div>
    </xsl:template>

    <xsl:template match="memberships" xmlns="http://www.w3.org/1999/xhtml">
        <div class="keeptogether">
            <div class="sectionheader">
                <img class="sectionheader" alt="" src="sectionheader.png"/>
                <h2 class="memberships">Memberships:</h2>
            </div>
            <table class="memberships">
                <xsl:for-each select="society">
                    <tr class="{name(.)}">
                        <td class="name affiliation vcard">
                            <span class="fn org">
                                <xsl:value-of select="name"/>
                            </span>
                            <a href="#privatedetails" class="include" title="Author"> </a>
                        </td>
                        <td class="grade">
                            <xsl:value-of select="grade"/>
                        </td>
                        <td class="period">
                            <xsl:call-template name="daterange">
                                <xsl:with-param name="start" select="start"/>
                                <xsl:with-param name="end" select="end"/>
                            </xsl:call-template>
                        </td>
                    </tr>
                </xsl:for-each>
            </table>
        </div>
    </xsl:template>

    <xsl:template match="recognitions" xmlns="http://www.w3.org/1999/xhtml">
        <div class="keeptogether">
            <div class="sectionheader">
                <img class="sectionheader" alt="" src="sectionheader.png"/>
                <h2 class="recognitions">Awards and Recognitions:</h2>
            </div>
            <table class="recognitions">
                <xsl:for-each select="organisation">
                    <tr class="{name(.)}">
                        <td class="name">
                            <xsl:value-of select="name"/>
                        </td>
                        <td class="grade">
                            <xsl:value-of select="grade"/>
                        </td>
                        <td class="when">
                            <xsl:call-template name="dt:format-date-time">
                                <xsl:with-param name="xsd-date-time" select="when"/>
                                <xsl:with-param name="format" select="'%b %Y'"/>
                            </xsl:call-template>
                        </td>
                    </tr>
                    <xsl:if test="description/text()">
                        <tr class="{name(.)}">
                            <td class="description" colspan="3">
                                <xsl:apply-templates select="description"/>
                            </td>
                        </tr>
                    </xsl:if>
                </xsl:for-each>
            </table>
        </div>
    </xsl:template>

    <xsl:template name="currencysymbol" xmlns="http://www.w3.org/1999/xhtml">
        <xsl:param name="currency" select="''"/>
        <xsl:choose>
            <xsl:when test="$currency='EUR'">€</xsl:when>
            <xsl:when test="$currency='GBP'">£</xsl:when>
            <xsl:when test="$currency='USD'">US$</xsl:when>
            <xsl:otherwise>
                <xsl:value-of select="$currency"/>
            </xsl:otherwise>
        </xsl:choose>
    </xsl:template>
    <xsl:template name="outputexperiences" xmlns="http://www.w3.org/1999/xhtml">
        <xsl:param name="exclude" select="''"/>
        <xsl:param name="include" select="'*'"/>
        <div class="experiences vcalendar">
            <xsl:for-each select="experience">
                <xsl:if
                    test="($exclude='' or (contains(iscocategory/nacecode/text(), substring-before($exclude, ';'))!=true()
                    and (substring-before(substring-after($exclude, ';'), ';')='' or contains(iscocategory/nacecode/text(), substring-before(substring-after($exclude, ';'), ';'))!=true())
                    and (substring-before(substring-after(substring-after($exclude, ';'), ';'), ';')='' or contains(iscocategory/nacecode/text(), substring-before(substring-after(substring-after($exclude, ';'), ';'), ';'))!=true())))
                    and ($include='*' or
                    (substring-before($include, ';')!='' and contains(iscocategory/nacecode/text(), substring-before($include, ';'))=true())
                    or (substring-before(substring-after($include, ';'), ';')!='' and contains(iscocategory/nacecode/text(), substring-before(substring-after($include, ';'), ';'))=true())
                    or (substring-before(substring-after(substring-after($include, ';'), ';'), ';')!='' and contains(iscocategory/nacecode/text(), substring-before(substring-after(substring-after($include, ';'), ';'), ';'))=true()))">
                    <xsl:if
                        test="($showopensource_ and earnings='Open Source') or ($showunpaid_ and earnings='Unpaid') or ($showpaid_ and earnings/@currency)">
                        <div class="keeptogether">
                            <table class="experience">
                                <thead>
                                    <tr class="{name(.)}">
                                        <th class="{name(.)}" colspan="3">[NACE sector code
                                                <xsl:value-of select="iscocategory/nacecode"/>
                                            <xsl:variable name="nacecode"
                                                select="iscocategory/nacecode/text()"/>
                                                (<xsl:value-of
                                                select="document('schemas/NACE_COM.xsd')//*[@value=$nacecode]/*/*[@xml:lang='en']"
                                            />)]</th>
                                    </tr>
                                    <tr class="{name(.)}">
                                        <th class="{name(.)}" colspan="3">[ISCO code <xsl:value-of
                                                select="iscocategory/iscofield4"/>
                                            <xsl:variable name="iscofield4"
                                                select="iscocategory/iscofield4/text()"/>
                                                (<xsl:value-of
                                                select="document('schemas/ISCO_88_COM.xsd')//*[@value=$iscofield4]/*/*[@xml:lang='en']"
                                            />)]</th>
                                    </tr>
                                </thead>
                                <tfoot>
                                    <tr class="{name(.)} spacer">
                                        <td colspan="3"> </td>
                                    </tr>
                                </tfoot>
                                <tbody>
                                    <tr class="{name(.)} vevent">
                                        <td class="title">
                                            <span class="summary">
                                                <xsl:value-of select="title"/>
                                            </span>
                                            <a href="#privatedetails" class="include" title="Author"
                                            > </a>
                                        </td>
                                        <td class="href">
                                            <xsl:if test="title/@href">(ref: <a href="{title/@href}">
                                                  <xsl:value-of select="title/@href"/>
                                                </a>)</xsl:if>
                                        </td>
                                        <td class="period">
                                            <xsl:for-each select="start">
                                                <xsl:if test="position()!=1">
                                                  <br/>
                                                </xsl:if>
                                                <xsl:variable name="startdate"
                                                  select="self::node()/text()"/>
                                                <xsl:variable name="enddate"
                                                  select="following-sibling::*[1]/text()"/>
                                                <xsl:call-template name="daterange">
                                                  <xsl:with-param name="start" select="$startdate"/>
                                                  <xsl:with-param name="end" select="$enddate"/>
                                                </xsl:call-template>
                                            </xsl:for-each>
                                        </td>
                                    </tr>
                                    <xsl:if test="employer">
                                        <tr class="{name(.)} vcard">
                                            <td class="employer">
                                                <span class="org">
                                                  <xsl:value-of select="employer"/>
                                                </span>
                                                <a href="#privatedetails" class="include"
                                                  title="Author"> </a>
                                            </td>
                                            <td class="earnings">Earnings: <xsl:variable
                                                  name="earningsequiv">
                                                  <xsl:call-template name="currencysymbol">
                                                  <xsl:with-param name="currency"
                                                  select="earnings/@currency"/>
                                                  </xsl:call-template>
                                                  <xsl:choose>
                                                  <xsl:when test="earnings/@periodicity='salary'">
                                                  <xsl:value-of select="earnings"/>
                                                  </xsl:when>
                                                  <xsl:when test="earnings/@periodicity='hourly'">
                                                  <xsl:value-of select="earnings*2000"/>
                                                  </xsl:when>
                                                  <xsl:when test="earnings/@periodicity='daily'">
                                                  <xsl:value-of select="earnings*250"/>
                                                  </xsl:when>
                                                  </xsl:choose>
                                                </xsl:variable>
                                                <abbr
                                                  title="Equivalent to {$earningsequiv} per annum">
                                                  <xsl:call-template name="currencysymbol">
                                                  <xsl:with-param name="currency"
                                                  select="earnings/@currency"/>
                                                  </xsl:call-template>
                                                  <xsl:value-of select="earnings"/>
                                                  <xsl:choose>
                                                  <xsl:when test="earnings/@periodicity='salary'">
                                                  per annum.</xsl:when>
                                                  <xsl:when test="earnings/@periodicity='hourly'">
                                                  per hour.</xsl:when>
                                                  <xsl:when test="earnings/@periodicity='daily'">
                                                  per day.</xsl:when>
                                                  </xsl:choose>
                                                </abbr></td>
                                            <td class="location">
                                                <xsl:value-of select="location/city"/>, <xsl:if
                                                  test="location/county">
                                                  <xsl:value-of select="location/county"/>, </xsl:if>
                                                <xsl:variable name="country"
                                                  select="location/country/text()"/>
                                                <xsl:value-of
                                                  select="document('schemas/ISOCountryCodeType-V2006.xsd')//*[@value=$country]/*/*"
                                                />
                                            </td>
                                        </tr>
                                    </xsl:if>
                                    <tr class="{name(.)}">
                                        <td class="description" colspan="3">
                                            <xsl:apply-templates select="description"/>
                                        </td>
                                    </tr>
                                    <xsl:if
                                        test="contains($inhibitdetailfor, substring(iscocategory/nacecode/text(), 1, 3))!=true()">
                                        <xsl:if test="detail/text()">
                                            <tr class="{name(.)}">
                                                <td class="detail" colspan="3">
                                                  <xsl:apply-templates select="detail"/>
                                                </td>
                                            </tr>
                                        </xsl:if>
                                    </xsl:if>
                                </tbody>
                            </table>
                        </div>
                    </xsl:if>
                </xsl:if>
            </xsl:for-each>
        </div>
    </xsl:template>

    <xsl:template match="experiences" xmlns="http://www.w3.org/1999/xhtml">
        <div class="sectionheader">
            <img class="sectionheader" alt="" src="sectionheader.png"/>
            <h2 class="experiences">Relevant Experiences:</h2>
        </div>
            <xsl:call-template name="outputexperiences">
                <xsl:with-param name="exclude" select="$inhibitdetailfor"/>
            </xsl:call-template>
        <xsl:choose>
            <xsl:when test="$showotherexperiences_">
                <xsl:if test="$inhibitdetailfor">
                    <div class="sectionheader">
                        <img class="sectionheader" alt="" src="sectionheader.png"/>
                        <h2 class="experiences">Other Experiences:</h2>
                    </div>
                    <xsl:call-template name="outputexperiences">
                        <xsl:with-param name="include" select="$inhibitdetailfor"/>
                    </xsl:call-template>
                </xsl:if>
            </xsl:when>
            <xsl:otherwise>
                <div>
                    <h1 style="text-align:center">This is the short format resume listing only
                        relevant experiences.<br/>A fully detailed version can be found online at <a
                            href="http://www.nedprod.com/xmlcv/"
                        >http://www.nedprod.com/xmlcv/</a>.</h1>
                </div>
            </xsl:otherwise>
        </xsl:choose>
    </xsl:template>

    <xsl:template match="publications" xmlns="http://www.w3.org/1999/xhtml">
        <div class="keeptogether">
            <div class="sectionheader">
                <img class="sectionheader" alt="" src="sectionheader.png"/>
                <h2 class="publications">Publications:</h2>
            </div>
            <table class="publications">
                <xsl:for-each select="mods:modsCollection">
                    <xsl:for-each select="mods:mods">
                        <tr class="{name(.)}">
                            <td class="citation">
                                <xsl:for-each select="mods:name">
                                    <xsl:if test="mods:role/mods:roleTerm='author'">
                                        <xsl:value-of select="mods:namePart[@type='family']"
                                            />&#160;<xsl:for-each
                                            select="mods:namePart[@type='given']"><xsl:value-of
                                                select="substring(./text(), 1, 1)"
                                        />.</xsl:for-each>, </xsl:if>
                                </xsl:for-each>(<xsl:value-of
                                    select="mods:originInfo/mods:dateIssued"/>), <xsl:choose>
                                    <xsl:when test="mods:genre='book'">
                                        <cite>
                                            <xsl:value-of select="mods:titleInfo/mods:title"/>
                                            <xsl:if test="mods:titleInfo/mods:subTitle/text()">:
                                                  <xsl:value-of
                                                  select="mods:titleInfo/mods:subTitle"/></xsl:if>
                                        </cite>, </xsl:when>
                                    <xsl:otherwise> '<xsl:value-of
                                            select="mods:titleInfo/mods:title"/><xsl:if
                                            test="mods:titleInfo/mods:subTitle/text()">:
                                                <xsl:value-of select="mods:titleInfo/mods:subTitle"
                                            /></xsl:if>', <cite>
                                            <xsl:value-of
                                                select="mods:relatedItem[@type='host']/mods:titleInfo/mods:title"/>
                                            <xsl:if test="mods:part/mods:detail/mods:volume"> vol.
                                                  <xsl:value-of
                                                  select="mods:part/mods:detail/mods:volume"/>
                                            </xsl:if>
                                            <xsl:if test="mods:part/mods:detail/mods:number"> no.
                                                  <xsl:value-of
                                                  select="mods:part/mods:detail/mods:number"/>
                                            </xsl:if>
                                            <xsl:if test="mods:part/mods:detail/mods:extent"> pp.
                                                  <xsl:value-of
                                                  select="mods:part/mods:detail/mods:extent/mods:start"
                                                  />-<xsl:value-of
                                                  select="mods:part/mods:detail/mods:extent/mods:end"
                                                />
                                            </xsl:if>
                                        </cite>, </xsl:otherwise>
                                </xsl:choose>
                                <xsl:value-of select="mods:originInfo/mods:publisher"/>.<xsl:if
                                    test="mods:identifier[@type='citekey']/text()"> Citation key:
                                        <xsl:value-of select="mods:identifier[@type='citekey']"
                                    />.</xsl:if><xsl:if test="mods:location/mods:url/text()"> URL:
                                        <a href="{mods:location/mods:url}">
                                        <xsl:value-of select="mods:location/mods:url"/>
                                    </a>.</xsl:if>
                            </td>
                        </tr>
                        <xsl:if test="mods:abstract/text()">
                            <tr class="{name(.)}">
                                <td class="abstract">
                                    <xsl:apply-templates select="mods:abstract"/>
                                </td>
                            </tr>
                        </xsl:if>
                    </xsl:for-each>
                </xsl:for-each>
            </table>
        </div>
    </xsl:template>
    
    <xsl:template match="academicreferees" xmlns="http://www.w3.org/1999/xhtml">
        <h1 class="academicreferees">Academic references available from <xsl:value-of select="."
            /></h1>
    </xsl:template>

    <xsl:template match="workreferees" xmlns="http://www.w3.org/1999/xhtml">
        <h1 class="workreferees">Work references available from <xsl:value-of select="."/></h1>
    </xsl:template>
</xsl:stylesheet>
